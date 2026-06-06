import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

export const login = async ({ username, password }) => {
  const user = await prisma.user.findFirst({
    where: { username, deleted_at: null },
    include: { branch: true },
  });

  if (!user || !user.is_active) {
    throw { status: 401, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw { status: 401, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role, branchId: user.branch_id },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      branch: { id: user.branch.id, name: user.branch.name },
    },
  };
};

export const getUsers = async ({ branchId }) => {
  return prisma.user.findMany({
    where: { branch_id: branchId, deleted_at: null },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      is_active: true,
      created_at: true,
    },
    orderBy: { created_at: 'asc' },
  });
};

export const createUser = async (data) => {
  const existing = await prisma.user.findFirst({
    where: { username: data.username },
  });
  if (existing) throw { status: 409, message: 'اسم المستخدم مستخدم بالفعل' };

  const password_hash = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      branch_id: data.branch_id,
      name: data.name,
      username: data.username,
      password_hash,
      role: data.role,
    },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      is_active: true,
    },
  });
};

export const updateUser = async (id, data) => {
  const user = await prisma.user.findFirst({
    where: { id, deleted_at: null },
  });
  if (!user) throw { status: 404, message: 'المستخدم غير موجود' };

  const updateData = { ...data };
  if (data.password) {
    updateData.password_hash = await bcrypt.hash(data.password, 10);
    delete updateData.password;
  }

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      is_active: true,
    },
  });
};

export const deleteUser = async (id) => {
  const user = await prisma.user.findFirst({
    where: { id, deleted_at: null },
  });
  if (!user) throw { status: 404, message: 'المستخدم غير موجود' };

  return prisma.user.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};