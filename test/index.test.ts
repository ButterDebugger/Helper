import { assertEquals } from "@std/assert";
import {
    fromUint8Array,
    strictEquals,
    strictTypeof,
    toUint8Array,
} from "../src/index.ts";

Deno.test("Strict type comparison", () => {
    assertEquals(strictTypeof(null), "null");
    assertEquals(strictTypeof(undefined), "undefined");
    assertEquals(strictTypeof(true), "Boolean");
    assertEquals(strictTypeof(false), "Boolean");
    assertEquals(strictTypeof(123), "Number");
    assertEquals(strictTypeof(Number.NaN), "NaN");
    assertEquals(strictTypeof(Number.POSITIVE_INFINITY), "Infinity");
    assertEquals(strictTypeof(Number.NEGATIVE_INFINITY), "-Infinity");
    assertEquals(strictTypeof("test"), "String");
    assertEquals(strictTypeof(Symbol("test")), "Symbol");
    assertEquals(strictTypeof(321n), "BigInt");
    assertEquals(strictTypeof({}), "Object");
    assertEquals(strictTypeof([]), "Array");
    assertEquals(strictTypeof(new Set()), "Set");
    assertEquals(strictTypeof(new Map()), "Map");
    assertEquals(strictTypeof(new Date()), "Date");
    assertEquals(strictTypeof(/[a-z]/g), "RegExp");
    assertEquals(
        strictTypeof(() => {}),
        "Function",
    );

    class A {}
    class B extends A {}

    assertEquals(strictTypeof(new A()), "A");
    assertEquals(strictTypeof(new B()), "B");
});

Deno.test("Strict comparison", () => {
    assertEquals(strictEquals(null, null), true);
    assertEquals(strictEquals(undefined, undefined), true);
    assertEquals(strictEquals(true, true), true);
    assertEquals(strictEquals(false, false), true);
    assertEquals(strictEquals(123, 123), true);
    assertEquals(strictEquals(Number.NaN, Number.NaN), true);
    assertEquals(
        strictEquals(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
        true,
    );
    assertEquals(
        strictEquals(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
        true,
    );

    assertEquals(strictEquals("test", "test"), true);
    assertEquals(strictEquals(Symbol("test"), Symbol("test")), false);
    assertEquals(strictEquals(321n, 321n), true);
    assertEquals(strictEquals({}, {}), true);
    assertEquals(strictEquals([], []), true);
    assertEquals(strictEquals(new Set(), new Set()), true);
    assertEquals(strictEquals(new Map(), new Map()), true);
    assertEquals(strictEquals(new Date(123), new Date(122)), false);
    assertEquals(strictEquals(new Date(102020), new Date(102020)), true);
    assertEquals(strictEquals(/[a-z]/g, /[a-z]/g), true);

    class A {}
    class B extends A {}

    const a = new A();
    const b = new B();

    assertEquals(strictEquals(new A(), new A()), false);
    assertEquals(strictEquals(a, new A()), false);
    assertEquals(strictEquals(a, a), true);
    assertEquals(strictEquals(new A(), new B()), false);
    assertEquals(strictEquals(a, new B()), false);
    assertEquals(strictEquals(a, b), false);
});

Deno.test("Uint8Array and string conversion", () => {
    const str = "Hello, world!";
    const uint8 = toUint8Array(str);
    const str2 = fromUint8Array(uint8);
    assertEquals(str, str2);

    const uint8_2 = new Uint8Array([
        72,
        101,
        108,
        108,
        111,
        44,
        32,
        119,
        111,
        114,
        108,
        100,
        33,
    ]);
    const str3 = fromUint8Array(uint8_2);
    assertEquals(str3, "Hello, world!");

    const uint8_3 = toUint8Array(str3);
    assertEquals(uint8_3, uint8_2);
});
