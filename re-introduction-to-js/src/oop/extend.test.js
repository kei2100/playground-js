test('before ES2015', () => {
  function Parent() {
    this.name = 'parent';
  }
  Parent.prototype.getName = function () {
    return this.name;
  };

  function Child() {
    if (!(this instanceof Child)) {
      return new Child();
    }
    this.name = 'child';
  }

  function inherits(ctor, suctor) {
    if (ctor === undefined || ctor === null
      || suctor === undefined || suctor === null
      || suctor.prototype === undefined) {
      throw new TypeError("oops");
    }
    Object.setPrototypeOf(ctor.prototype, suctor.prototype)
  }

  inherits(Child, Parent);

  expect(new Child().getName()).toBe('child');
  expect(new Parent().getName()).toBe('parent');

  expect(new Child()).toBeInstanceOf(Child);
  expect(new Child()).toBeInstanceOf(Parent);
  expect(new Child()).toBeInstanceOf(Object);

  expect(Object.getPrototypeOf(new Child())).toBe(Child.prototype);
  expect(Object.getPrototypeOf(Child.prototype)).toBe(Parent.prototype);
  expect(Object.getPrototypeOf(Parent.prototype)).toBe(Object.prototype);

  expect(new Child().constructor).toBe(Child);
  expect(Child.prototype.constructor).toBe(Child);
  expect(Parent.prototype.constructor).toBe(Parent);
});

test('since ES2015', () => {
  class Parent {
    constructor() {
      this.name = 'parent';
    }

    getName() {
      return this.name
    }
  }

  class Child extends Parent {
    constructor() {
      super();
      this.name = 'child';
    }
  }

  expect(new Child().getName()).toBe('child');
  expect(new Parent().getName()).toBe('parent');

  expect(new Child()).toBeInstanceOf(Child);
  expect(new Child()).toBeInstanceOf(Parent);
  expect(new Child()).toBeInstanceOf(Object);

  expect(Object.getPrototypeOf(new Child())).toBe(Child.prototype);
  expect(Object.getPrototypeOf(Child.prototype)).toBe(Parent.prototype);
  expect(Object.getPrototypeOf(Parent.prototype)).toBe(Object.prototype);

  expect(new Child().constructor).toBe(Child);
  expect(Child.prototype.constructor).toBe(Child);
  expect(Parent.prototype.constructor).toBe(Parent);
});
