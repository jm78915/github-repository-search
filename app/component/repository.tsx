'use client';

import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { FaRegStar } from 'react-icons/fa6';

import { Topic } from '@/app/component/topic';
import { Repository as InterfaceRepository } from '@/app/interface/repositories';

type Props = {
    repository: InterfaceRepository;
} & HTMLAttributes<HTMLDivElement>;

export const Repository = ({ repository, className }: Props) => (
    <div
        className={clsx(
            'flex flex-col gap-y-2 rounded-md border border-gray-400 p-3',
            'bg-white dark:bg-gray-800',
            className,
        )}
        key={repository.id}
    >
        <div className="flex items-center gap-x-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                alt=""
                className="w-6"
                loading="lazy"
                src={`https://avatars.githubusercontent.com/u/${repository.owner.id}?s=40&v=4`}
            />

            <a className="hover:underline" href={repository.url}>
                {repository.full_name}
            </a>
        </div>

        <div>{repository.description}</div>

        <div className="flex flex-wrap gap-1">
            {repository.topics.map((topic) => (
                <Topic
                    className="border border-slate-300 bg-slate-200 text-xs dark:bg-slate-600"
                    key={repository.id + topic}
                    topic={topic}
                />
            ))}
        </div>

        <div className="flex gap-x-2">
            {repository.language && (
                <>
                    <div>{repository.language}</div>

                    <div>·</div>
                </>
            )}

            <div className="flex items-center gap-x-1">
                <FaRegStar />

                {new Intl.NumberFormat('en-US', {
                    notation: 'compact',
                }).format(repository.stargazers_count)}
            </div>

            <div>·</div>

            <div>
                Updated on{' '}
                {new Date(repository.updated_at).toLocaleDateString()}
            </div>
        </div>
    </div>
);
