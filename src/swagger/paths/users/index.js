module.exports = {
  'get-users': {
    parameters: [
      {
        name: 'userId',
        in: 'path',
        required: true,
        description: 'Id of user',
        type: 'string',
      },
    ],
    get: {
      tags: [
        'Users',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      summary: 'Get specific user',
      responses: {
        200: {
          description: 'User is found in db',
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: '#/definitions/User',
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
