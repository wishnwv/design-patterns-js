export interface LineItem {
    id: string;
    name: string;
    unitPrice: number;
    quantity: number;
}

export interface InvoiceData {
    items: LineItem[];
    taxRate: number; 
}


class Invoice {
    private taxRate;
    private items;
    private unit = "$"

    constructor(data: InvoiceData) {
        this.taxRate = data.taxRate;
        this.items = data.items;
    }

    public calculateSubtotal(): number {
        return this.items.reduce((acc, item) => acc += item.quantity * item.unitPrice, 0)
    }

    public calculateTax(): number {
        return this.calculateSubtotal() * this.taxRate;
    }

    public calculateTotal(): number {
        return this.calculateSubtotal() + this.calculateTax();
    }

    public getInvoiceDetails() {
        return {
            items: this.items,
            subtotal: this.unit.concat(this.calculateSubtotal() as unknown as string),
            tax: this.unit.concat(this.calculateTax() as unknown as string),
            total: this.unit.concat(this.calculateTotal() as unknown as string)
        };
    }

}


class PDFHandler {
    private data;

    constructor(data:any) {
        this.data = data;
    }

    generatePDF() {
        return JSON.stringify(this.data)
    }

    save() {
        console.log("Saving PDF -->", this.generatePDF())
    }

}

const cartItems: LineItem[] = [
  { id: "1", name: "Design Patterns eBook", unitPrice: 20, quantity: 1 },
  { id: "2", name: "TypeScript Masterclass", unitPrice: 49, quantity: 2 }
];

// Create the invoice calculations object
const myInvoice = new Invoice({
    taxRate:0.10,
    items: cartItems
});

const pdf = new PDFHandler(myInvoice.getInvoiceDetails())

pdf.save();

console.log(myInvoice.getInvoiceDetails())