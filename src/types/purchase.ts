
export interface Purchase {
    id: number;
    hours: number;
    price: number;
    subscriberId: number;
    startDate: Date;
    endDate: Date | null;
    purchasedHours: number;
    usedHours: number;
}
