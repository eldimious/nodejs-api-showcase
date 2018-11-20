module.exports = {
  'list-tweets': {
    parameters: [
      {
        name: 'publisher',
        in: 'query',
        required: false,
        description: 'Optional: publisher to get his tweets docs',
        type: 'string',
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        description: 'Limit for pagination',
        type: 'integer',
      },
      {
        name: 'page',
        in: 'query',
        required: false,
        description: 'Page for pagination',
        type: 'integer',
      },
    ],
    get: {
      tags: [
        'Tweets',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      summary: 'Get list of tweets based on query params otherwise gets all tweets docs that user added',
      responses: {
        200: {
          description: 'List of tweets found',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: '#/definitions/Tweet',
                },
              },
              pagination: {
                type: 'object',
                $ref: '#/definitions/Pagination',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        401: {
          $ref: '#/components/responses/401',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
      },
    },
  },
  'post-tweets': {
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'Body for creating new tweet',
        schema: {
          type: 'object',
          required: [
            'imageUrl',
            'publisher',
          ],
          properties: {
            imageUrl: {
              type: 'string',
            },
            publisher: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
          },
        },
      },
    ],
    post: {
      tags: [
        'Tweets',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      summary: 'Create new tweet mannualy',
      responses: {
        200: {
          description: 'Tweet created',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: '#/definitions/Tweet',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        401: {
          $ref: '#/components/responses/401',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
      },
    },
  },
  'get-tweets': {
    parameters: [
      {
        name: 'tweetId',
        in: 'path',
        required: true,
        description: 'Id of tweet doc',
        type: 'string',
      },
    ],
    get: {
      tags: [
        'Tweets',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      summary: 'Get specific tweet based on tweetId',
      responses: {
        200: {
          description: 'Tweet found',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: '#/definitions/Tweet',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        401: {
          $ref: '#/components/responses/401',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
      },
    },
  },
};
