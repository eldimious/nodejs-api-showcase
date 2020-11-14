module.exports = {
  401: {
    type: 'object',
    properties: {
      status: {
        type: 'integer',
        default: 401,
      },
      data: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            default: 401,
          },
          message: {
            type: 'string',
            default: 'Invalid user token',
          },
        },
      },
    },
  },
  404: {
    type: 'object',
    properties: {
      status: {
        type: 'integer',
        default: 404,
      },
      data: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            default: 404,
          },
          message: {
            type: 'string',
            default: 'The resource was not found',
          },
        },
      },
    },
  },
  400: {
    type: 'object',
    properties: {
      status: {
        type: 'integer',
        default: 400,
      },
      data: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            default: 400,
          },
          message: {
            type: 'string',
            default: 'Bad request',
          },
        },
      },
    },
  },
  500: {
    type: 'object',
    properties: {
      status: {
        type: 'integer',
        default: 500,
      },
      data: {
        type: 'object',
        properties: {
          code: {
            type: 'integer',
            default: 500,
          },
          message: {
            type: 'string',
            default: 'Internal Server Error',
          },
        },
      },
    },
  },
};
