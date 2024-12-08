
import jwt from 'jsonwebtoken'
const verifymebro = (req, res, next) => {
  console.log("hello")
  const api_here = req.header('Admin_here');
  if (!api_here) {
    return res.status(404).json({ message: "Man you need api here, your no admin" })
  }
  if (api_here != process.env.ADMIN_KEY) {
    return res.status(404).json({ message: "man your trying to breakin, better luck next time" })
  }
  next();
}

const verifyifmybookingvalid = (req, res, next) => {
  const token = req.header('authorization');
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const checkifvalid = jwt.verify(token, process.env.JWT_SECRET);
    req.user = checkifvalid;
    
    next();
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}



export { verifymebro, verifyifmybookingvalid }