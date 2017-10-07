const debug = require('debug')('services:SOCIALNETWORK');
const Promise = require('bluebird');
const errors = require('../common/errors');
const request = require('request');
const Twitter = require('twitter');
Promise.promisifyAll(require('request'));

function init(interfaces) {
  debug('------- INIT SERVICES:SOCIALNETWORK ---------');
  const createErrorMessage = (error, defaultMsg) => error && error.message ? error.message : defaultMsg;


  const getInstagramApiUrlForMedia = ({ hashtag, userId, count, nextMaxId }) => {
    if (hashtag) {
      return nextMaxId ? `tags/${hashtag}/media/recent/?count=${count}&max_id=${nextMaxId}` : `tags/${hashtag}/media/recent/?count=${count}`;
    }
    return nextMaxId ? `users/${userId}/media/recent/?count=${count}&max_id=${nextMaxId}` : `users/${userId}/media/recent/?count=${count}`;
  };


  const lookupInstagramForMedia = ({ hashtag, userId, count = 33, nextMaxId, token }) => {
    const params = getInstagramApiUrlForMedia({ hashtag, userId, count, nextMaxId });
    const options = {
      url: `https://api.instagram.com/v1/${params}&access_token=${token}`,
    };
    return request.getAsync(options)
      .then(response => helperService.handleInstagramApiResponse(response))
      .then((data) => {
        const tagsContent = {
          pagination: {
            next_max_id: data.pagination && data.pagination.next_max_tag_id ? data.pagination.next_max_tag_id : undefined,
          },
          posts: data.data || [],
        };
        return tagsContent;
      })
      .catch((error) => {
        if (error.name === 'not_found' || error.name === 'json_parse') {
          return Promise.reject(error);
        } else if (error && error.message) {
          return Promise.reject(new errors.not_found(error.message));
        }
        return Promise.reject(new errors.not_found('Instagram lookupInstagramForMedia general error.'));
      });
  };


  const getInstagramMedia = (options) => {
    debug('get instagram media', options);
    return lookupInstagramForMedia({ hashtag: options.hashtag, userId: options.userId, count: options.count, nextMaxId: options.nextMaxId, token: options.token.tokenKey })
      .then(media => media)
      .catch(error => Promise.reject(new errors.not_found(createErrorMessage(error, 'Error in creating user func.'))));
  };


  const getTwitterApiUrlForMedia = ({ hashtag, userId, count, nextMaxId, sinceId, credentials }) => {
    const client = new Twitter({
      consumer_key: credentials.consumerKey,
      consumer_secret: credentials.consumerSecret,
      access_token_key: credentials.tokenKey,
      access_token_secret: credentials.tokenSecret,
    });
    if (hashtag) {
      const q = `${hashtag} AND -filter:retweets AND -filter:replies`;
      return client.get('search/tweets', { q, result_type: 'recent', count, max_id: nextMaxId });
    }
    return client.get('statuses/user_timeline', { screen_name: userId, count, max_id: nextMaxId, since_id: sinceId, include_rts: false, exclude_replies: true });
  };


  const getPaginatioForTag = (data) => {
    let nextMaxId;
    let sinceId;
    if (data && data.next_results) {
      nextMaxId = data.next_results.substring(data.next_results.lastIndexOf('?max_id=') + 1, data.next_results.lastIndexOf('&q='));
    }
    if (data && data.since_id) {
      sinceId = data.since_id;
    }
    return { next_max_id: nextMaxId, since_id: sinceId };
  };


  const lookupTwitterForMedia = ({ hashtag, userId, count, nextMaxId, sinceId, credentials }) => getTwitterApiUrlForMedia({ hashtag, userId, count, nextMaxId, sinceId, credentials })
    .then((result) => {
      const hashtagsContent = {
        pagination: {},
        posts: [],
      };
      if (result && result.search_metadata) {
        hashtagsContent.pagination = getPaginatioForTag(result.search_metadata);
      }
      hashtagsContent.posts = result.statuses || [];
      return hashtagsContent;
    })
    .catch((error) => {
      if (error && error[0] && error[0].code === 89) {
        return Promise.reject(new errors.not_found('Twitter token error.'));
      } else if (error && error[0] && error[0].code === 32) {
        return Promise.reject(new errors.not_found('Twitter credentials error.'));
      } else if (error && error[0] && error[0].code === 215) {
        return Promise.reject(new errors.not_found('Twitter credentials error.'));
      } else if (error.name === 'not_found' || error.name === 'json_parse') {
        return Promise.reject(error);
      } else if (error && error.message) {
        return Promise.reject(new errors.not_found(error.message));
      } else if (error && Array.isArray(error) && error.length > 0) {
        return Promise.reject(new errors.not_found(error[0].message));
      }
      return Promise.reject(new errors.not_found('Twitter lookupHashtagContent general error.'));
    });


  const getTwitterMedia = (options) => {
    debug('get twitter media', options);
    return lookupTwitterForMedia({ hashtag: options.hashtag, userId: options.userId, count: options.count, nextMaxId: options.nextMaxId, credentials: options.token })
      .then(media => media)
      .catch(error => Promise.reject(new errors.not_found(createErrorMessage(error, 'Error in creating user func.'))));
  };


  return {
    instagram: {
      getMedia: getInstagramMedia,
    },
    twitter: {
      getMedia: getTwitterMedia,
    },
  };
}

module.exports.init = init;
