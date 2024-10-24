import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

const MAX_FAILED_ATTEMPTS = 5;

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      // Increment failed attempts if the user exists
      if (user) {
        await User.update(
          { failed_attempts: user.failed_attempts + 1 },
          { where: { id: user.id } }
        );

        // Lock the account after too many failed attempts
        if (user.failed_attempts + 1 >= MAX_FAILED_ATTEMPTS) {
          await User.update(
            { account_locked: true },
            { where: { id: user.id } }
          );
          res.status(403).json({ error: 'Account locked due to too many failed attempts' });
          return;
        }
      }

      res.status(401).json({ error: 'Incorrect username or password' });
      return;
    }

    // Check if the account is locked
    if (user.account_locked) {
      res.status(403).json({ error: 'Account is locked' });
      return;
    }

    // Reset failed attempts on successful login
    await User.update(
      { failed_attempts: 0 },
      { where: { id: user.id } }
    );

    // Proceed with login (e.g., send a JWT token)
    res.status(200).json({ message: 'Login successful', token: 'JWT token' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
};
