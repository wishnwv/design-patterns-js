enum Color {
    green = "green",
    red = "red",
    blue = "blue"
}

enum Size {
    small = "small",
    medium = "medium",
    large = "large"
}

enum Brand {
    puma = "puma",
    adidas = "adidas",
    nike = "nike"
}
class Product {

    constructor(
        public name:string,
        public color:Color,
        public size:Size,
        public brand:Brand
    ){}
}

class ProductFilter {
    private  products;
    constructor(products: Product[]){
        this.products = products;

    }
    filterByColor(color:Color){
        return this.products.filter((product:Product) => product.color === color);
    }
    filterBySize(size:Size){
        return this.products.filter((p:Product) => p.size === size);
    }
    filterByColorAndSize(color:Color,size:Size){
        return this.products.filter((p:Product) => p.color === color && p.size === size)
    }

    // state space explosion
}

let workoutTee = new Product("Workout T shirt", Color.green, Size.large, Brand.adidas);
let casualShirt = new Product("Casual shirt ", Color.blue, Size.small, Brand.puma);

// open for extenstion closed for modification


let products = [workoutTee,casualShirt]


// Specification pattern

interface Specification<T> {
    isSatisfied(item: T): boolean;
}


class ColorSpec implements Specification<Product>{
    constructor(private color:Color){}
    isSatisfied(product:Product):boolean{
        return product.color === this.color
    }
}

class SizeSpec implements Specification<Product>{
    constructor(public size:Size){}
    isSatisfied(product:Product){
        return product.size === this.size
    }
}

class BrandSpec implements Specification<Product>{
    constructor(public brand:Brand){}
    isSatisfied(product:Product){
        return product.brand === this.brand
    }
}

class AndSpec implements Specification<Product> {
    private specs;

    constructor(...specs: Specification<Product>[]){
        this.specs = specs;
    }
    isSatisfied(item: Product): boolean {
        return this.specs.every( spec => spec.isSatisfied(item))
    }
}

class OrSpec implements Specification<Product> {
    private specs;

    constructor(...specs: Specification<Product>[]) {
        this.specs = specs;
    }

    isSatisfied(item: Product): boolean {
        return this.specs.some( spec => spec.isSatisfied(item))
    }
}


class FlexProductFilter {
    filter(items:Product[], spec:Specification<Product>):Product[]{
        return items.filter((item) => spec.isSatisfied(item))
    }
}

const filter = new FlexProductFilter().filter(products,new OrSpec(
    new ColorSpec(Color.blue),
    new SizeSpec(Size.small)
));

console.log(filter)