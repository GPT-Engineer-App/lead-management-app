const auth = (req, res, next) => {
  // Dummy authentication middleware
  const token = req.headers.authorization;
  if (token) {
    req.user = { id: 'dummy-user-id', role: 'admin' }; // Replace with actual user data
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

const roleAuth = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
};

module.exports = { auth, roleAuth };