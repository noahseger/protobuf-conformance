# Protoscript

[Protoscript](https://github.com/TateThurston/protoscript)


## Caveats

Requires the following patch to compile the test message protos. Until patched upstream, the package is vendored with the patched changes.

```patch
diff --git a/impl/protoscript/vendor/protoscript/src/codegen/autogenerate/index.ts b/impl/protoscript/vendor/protoscript/src/codegen/autogenerate/index.ts
index 6caf6d1..cee0151 100644
--- a/impl/protoscript/vendor/protoscript/src/codegen/autogenerate/index.ts
+++ b/impl/protoscript/vendor/protoscript/src/codegen/autogenerate/index.ts
@@ -346,7 +346,14 @@ function writeProtobufSerializers(
         )})${printIfTypescript(`: ${node.content.namespacedName}`)} {
           switch (i) {
         `;
+
+        const seenValues = new Set<number>();
         node.content.values.forEach(({ name, value }) => {
+          if (seenValues.has(value)) {
+            return;
+          }
+
+          seenValues.add(value);
           result += `case ${value}: { return '${name}'; }\n`;
         });
 
@@ -650,7 +657,14 @@ function writeJSONSerializers(
         )})${printIfTypescript(`: ${node.content.namespacedName}`)} {
           switch (i) {
         `;
+
+        const seenValues = new Set<number>();
         node.content.values.forEach(({ name, value }) => {
+          if (seenValues.has(value)) {
+            return;
+          }
+
+          seenValues.add(value);
           result += `case ${value}: { return '${name}'; }\n`;
         });
 
diff --git a/impl/protoscript/vendor/protoscript/src/codegen/utils.ts b/impl/protoscript/vendor/protoscript/src/codegen/utils.ts
index 7cc590d..d8d96f3 100644
--- a/impl/protoscript/vendor/protoscript/src/codegen/utils.ts
+++ b/impl/protoscript/vendor/protoscript/src/codegen/utils.ts
@@ -20,7 +20,7 @@ function titleCase(str: string): string {
 
 function camelCase(segments: string[]): string {
   const [first, ...rest] = segments;
-  return first + rest.map(titleCase).join("");
+  return first + rest.filter(Boolean).map(titleCase).join("");
 }
 
 const FileLabel = {
```