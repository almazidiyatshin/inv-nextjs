import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const newRecord = await prisma.record.create({
			data: {
				shares: body.shares,
				bonds: body.bonds,
			},
		});

		return NextResponse.json(newRecord, { status: 201 });
	} catch (error) {
		console.error('[POST /api/testdb]', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
