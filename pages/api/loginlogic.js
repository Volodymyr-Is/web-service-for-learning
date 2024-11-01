import { users } from '../data/users';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
