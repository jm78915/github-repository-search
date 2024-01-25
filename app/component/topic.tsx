'use client';

import clsx from 'clsx';
import { HTMLAttributes } from 'react';

type Props = {
    topic: string;
} & HTMLAttributes<HTMLDivElement>;

export const Topic = ({ topic, className }: Props) => (
    <div className={clsx('rounded-md px-2 py-1', className)}>{topic}</div>
);
