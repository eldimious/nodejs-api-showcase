module.exports = {
  register: {
    post: {
      tags: [
        'Auth',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      description: 'Add a new user in DB.',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Body for creating new user',
          schema: {
            type: 'object',
            required: [
              'name',
              'surname',
              'username',
              'email',
              'password',
            ],
            properties: {
              name: {
                type: 'string',
              },
              surname: {
                type: 'string',
              },
              username: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
            },
          },
        },
      ],
      produces: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'New user registered',
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
  login: {
    post: {
      tags: [
        'Auth',
      ],
      security: [
        {
          Bearer: [],
        },
      ],
      description: 'Login user in dashboard.',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Body for login',
          schema: {
            type: 'object',
            required: [
              'email',
              'password',
            ],
            properties: {
              email: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
            },
          },
        },
      ],
      produces: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'User logins',
          schema: {
            type: 'object',
            properties: {

              data: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    $ref: '#/definitions/User',
                  },
                  token: {
                    type: 'object',
                    $ref: '#/definitions/Token',
                  },

                },
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
