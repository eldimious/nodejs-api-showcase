module.exports = {
  'list-posts': {
    parameters: [
      {
        name: 'publisher',
        in: 'query',
        required: false,
        description: 'Optional: publisher to get his posts docs',
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
        'Posts',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      summary: 'Get list of posts based on query params otherwise gets all posts docs that user added',
      responses: {
        200: {
          description: 'List of posts found',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: '#/definitions/Post',
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
  'post-posts': {
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'Body for creating new post',
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
        'Post',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      summary: 'Create new post mannualy',
      responses: {
        200: {
          description: 'Post created',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: '#/definitions/Post',
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
  'get-posts': {
    parameters: [
      {
        name: 'postId',
        in: 'path',
        required: true,
        description: 'Id of post doc',
        type: 'string',
      },
    ],
    get: {
      tags: [
        'Posts',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      summary: 'Get specific post based on postId',
      responses: {
        200: {
          description: 'Post found',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: '#/definitions/Post',
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
