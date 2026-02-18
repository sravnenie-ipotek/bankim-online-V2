import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  compareBanks(body: Record<string, unknown>): Promise<{
    status: string;
    message: string;
    data: Record<string, unknown>;
  }> {
    return Promise.resolve({
      status: 'success',
      message: 'Compare banks endpoint - migration pending',
      data: body,
    });
  }

  getMortgagePrograms(): Promise<{
    status: string;
    message: string;
    data: unknown[];
  }> {
    return Promise.resolve({
      status: 'success',
      message: 'Mortgage programs endpoint - migration pending',
      data: [],
    });
  }

  getCorsTest(origin: string | undefined): Promise<{
    message: string;
    origin: string;
    timestamp: string;
  }> {
    return Promise.resolve({
      message: 'CORS test successful',
      origin: origin ?? 'no-origin',
      timestamp: new Date().toISOString(),
    });
  }
}
