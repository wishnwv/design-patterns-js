### **Open/Closed Principle (OCP)**

> **Software entities (classes, modules, functions) should be open for extension, but closed for modification.**

* **Closed for Modification:** Once a class or module has been written, tested, and approved, its source code should **never be changed** to accommodate new features. Changing old code risks breaking existing functionality.
* **Open for Extension:** You should be able to **add new behaviors or features** to the system easily by writing **new code** (such as new classes, interfaces, or inheritance/composition relationships), rather than tampering with existing code.