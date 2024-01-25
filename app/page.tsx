'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { Repository } from '@/app/component/repository';
import { Repository as InterfaceRepository } from '@/app/interface/repositories';

export default function Home() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [repositories, setRepositories] = useState<InterfaceRepository[]>([]);
    const [isLoading, setLoading] = useState(false);

    const fetchRepositories = async (query: string, page = 1) => {
        setPage(page);
        setLoading(true);

        try {
            const json: {
                total_count: number;
                incomplete_results: boolean;
                items: InterfaceRepository[];
            } = await fetch(
                `/api/search/repositories?query=${query}&page=${page}`,
            ).then((response) => response.json());

            setRepositories(repositories.concat(json.items));
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setRepositories([]);
        fetchRepositories(query, 1);
    };

    const handleLoadMore = () => {
        fetchRepositories(query, page + 1);
    };

    return (
        <main className="flex h-screen w-screen flex-col">
            <form
                className={clsx(
                    'flex w-screen flex-shrink-0 flex-col items-center justify-center gap-y-3 transition-all',
                    {
                        'h-screen': repositories.length === 0,
                        'h-32': repositories.length !== 0,
                    },
                )}
                onSubmit={(event) => {
                    event.preventDefault();

                    handleSearch();
                }}
            >
                <input
                    className="w-54 rounded-md px-3 py-2 sm:w-96 dark:text-black"
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    placeholder="Repository keyword..."
                    required={true}
                    type="text"
                    value={query}
                />

                <button
                    className={clsx(
                        'flex items-center gap-x-2 rounded-md border px-6 py-1 transition-transform active:scale-95',
                        'border-gray-300 bg-white hover:bg-gray-100',
                        'dark:border-gray-400 dark:bg-gray-700 dark:hover:bg-gray-800',
                        {
                            'pointer-events-none cursor-not-allowed':
                                isLoading === true,
                        },
                    )}
                    disabled={isLoading === true}
                >
                    <div>搜尋</div>

                    {repositories.length === 0 && isLoading === true && (
                        <div className="flex items-center justify-center">
                            <CgSpinner className="animate-spin" />
                        </div>
                    )}
                </button>
            </form>

            <div className="flex flex-grow flex-col gap-y-3 overflow-y-auto px-10 py-5">
                {repositories.map((repository) => (
                    <Repository key={repository.id} repository={repository} />
                ))}

                {repositories.length > 0 && isLoading === true && (
                    <div className="flex items-center justify-center">
                        <CgSpinner className="animate-spin" />
                    </div>
                )}

                {repositories.length > 0 && isLoading === false && (
                    <button
                        className="hover:underline"
                        onClick={() => {
                            handleLoadMore();
                        }}
                    >
                        載入更多
                    </button>
                )}
            </div>
        </main>
    );
}
