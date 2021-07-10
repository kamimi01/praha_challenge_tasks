protocol GeometricShape {
    func area() -> Double
}

struct Rectangle: GeometricShape {
    let width: Double
    let height: Double
    
    func area() -> Double {
        return width * height
    }
}

struct Cicle: GeometricShape {
    let radius: Double
    
    func area() -> Double {
        return .pi * radius * radius
    }
}

struct Triangle: GeometricShape {
    let length: Double
    let breath: Double
    
    func area() -> Double {
        return length * breath
    }
}

struct AreaCalculator {
    func area(shape: GeometricShape) -> Double {
        return shape.area()
    }
}
