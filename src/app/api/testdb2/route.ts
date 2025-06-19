import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
	try {
		const result = await prisma.vtb.aggregate({
			// _sum: { shares: true, bonds: true },
		});

		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		console.error('[POST /api/testdb2]', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
