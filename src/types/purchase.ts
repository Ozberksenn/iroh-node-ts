
export interface Purchase {
    id: number;
    hours: number;
    price: number;
    customerId: number;
    startDate: Date;
    endDate: Date | null;
    purchasedHours: number;
    usedHours: number;
}
