export function createChainMock(
  getRawMany: jest.Mock,
  getCount?: jest.Mock,
): Record<string, unknown> {
  const chain: Record<string, unknown> = {
    innerJoin: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    addGroupBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    getRawMany,
  };
  if (getCount) {
    chain.getCount = getCount;
  }
  return chain;
}

export class QueryChainHelper {
  static createChainMock(
    getRawMany: jest.Mock,
    getCount?: jest.Mock,
  ): Record<string, unknown> {
    return createChainMock(getRawMany, getCount);
  }

  static createEmptyContentChain(): Record<string, unknown> {
    return createChainMock(jest.fn().mockResolvedValue([]));
  }

  static createFailingContentChain(
    error: Error,
  ): Record<string, unknown> {
    return createChainMock(jest.fn().mockRejectedValue(error));
  }

  static createItemsAndCountChains(
    items: unknown[],
    total: number,
  ): [Record<string, unknown>, Record<string, unknown>] {
    const itemsChain = createChainMock(jest.fn().mockResolvedValue(items));
    const countChain = createChainMock(
      jest.fn(),
      jest.fn().mockResolvedValue(total),
    );
    return [itemsChain, countChain];
  }
}
