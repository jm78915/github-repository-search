import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '@/app/interface/errorResponse';
import { Repository } from '@/app/interface/repositories';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    if (searchParams.has('query') === false) {
        return new NextResponse('缺少 query 參數', {
            status: 400,
        });
    }

    try {
        const json: {
            total_count: number;
            incomplete_results: boolean;
            items: Repository[];
        } & ErrorResponse = await fetch(
            `https://api.github.com/search/repositories?q=${searchParams.toString()}`,
            {
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    'X-Github-Api-Version': `${process.env.X_GITHUB_API_VERSION}`,
                },
            },
        ).then((response) => response.json());

        if (json.message !== undefined) {
            throw new Error(json.message);
        }

        return NextResponse.json(json);
    } catch (error) {
        console.error(error);

        return new NextResponse('取得 Repositories 錯誤', {
            status: 500,
        });
    }
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
