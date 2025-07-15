export class TicketDto {
    film: string;
    session: string;
    daytime: string;
    row: number;
    seat: number;
    price: number;
}
export class OrderDto {
    email: string;
    phone: string;
    tickets: TicketDto[];
}

export class orderResponseDto {
    total: number;
    items: TicketResponseDto[];
}

export class TicketResponseDto extends TicketDto {
    id: string
}