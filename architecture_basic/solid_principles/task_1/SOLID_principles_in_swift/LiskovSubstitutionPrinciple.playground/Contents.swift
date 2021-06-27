protocol Shape {
    func area() -> Double
}

class Rectangle: Shape {
    var width: Double = 0.0
    var height: Double = 0.0
    
    internal func area() -> Double {
        return width * height
    }
}

class Square: Shape {
    var side: Double = 0.0
    internal func area() -> Double {
        return side * side
    }
}
