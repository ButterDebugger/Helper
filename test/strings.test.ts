import { assertEquals } from "@std/assert";
import {
    base64UrlDecode,
    base64UrlEncode,
    fromUint8Array,
    randomString,
    toUint8Array,
} from "../src/index.ts";

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

Deno.test("Generate random string", () => {
    for (let l = 0; l < 100; l++) {
        const str = randomString(l);
        assertEquals(str.length, l);
    }
});

Deno.test("Base64Url encode and decode", () => {
    const str = randomString(100);

    const encoded = base64UrlEncode(str);

    const decoded = base64UrlDecode(encoded);

    assertEquals(decoded, str);
});
