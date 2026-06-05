import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Mizan POS Backend running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
});