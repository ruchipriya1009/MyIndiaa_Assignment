module.exports = {
  JSONResponse: (res, status, payload) => {
    res.status(status).json(payload);
  },
  ErrorResponse: (res, status, message) => {
    res.status(status).json({ error: message });
  },
};
