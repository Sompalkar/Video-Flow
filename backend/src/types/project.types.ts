

import mongoose from 'mongoose';
import z from 'zod'


const STATUS_VALUES = ['draft', 'in-progress', 'review', 'completed'] as const;

const StatusEnum = z.enum(STATUS_VALUES);
  
export const createProjectSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional(), 
  status: StatusEnum.default("draft")
});

export const updateProjectSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1),
  description: z.string().trim().optional(), 
  status: StatusEnum.default("draft")
});


