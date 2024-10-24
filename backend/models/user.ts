import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Define User attributes
interface UserAttributes {
  id: number;
  email: string;
  password_hash: string;
  failed_attempts: number;
  account_locked: boolean;
  trust_level: number;
  created_at: Date;
}

// Extend Sequelize's model class
class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password_hash!: string;
  public failed_attempts!: number;
  public account_locked!: boolean;
  public trust_level!: number;
  public created_at!: Date;
}

// Define the User model
User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    failed_attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    account_locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    trust_level: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,  // Disable auto-generated timestamps
  }
);

export default User;
