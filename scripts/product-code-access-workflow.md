# Product Code Access Workflow

Use this when the user gives a shop/course folder and asks which product codes get access to each cycle.

## Prompt Template

```text
Using scripts/product-code-access-workflow.md, gather product-code access for this folder:
<folder-path>

Return only this format:
Cycle 1 - ...
Cycle 2 - ...
Cycle 3 - ...
```

## Extraction Steps

1. Search the folder for product-code declarations and cycle access maps:

```sh
rg -n "productCode|productCode2|productCodes|Cycle-|checkPurchase|EnrollmentCodes|Combo|combo" <folder-path>
```

2. For each `Cycle-N` folder, read its `assets/ss.js` or equivalent info file.
   - The cycle's direct access codes are usually `productCode` and `productCode2`.
   - Preserve the code order from the file.

3. Find combo products.
   - Check `Combo*/assets/info.js` for combo `productCode` and `productCode2`.
   - Check `Combo*/assets/script.js` for mappings like `{ cycle: "Cycle-1", products: [...] }`.
   - Check cycle `assets/ss.js` maps such as `*ComboEnrollmentCodes` for combo codes counted against each cycle.

4. Include global or all-cycle access codes when the scripts check them for every cycle.
   - Common signs: `checkPurchase(["805", "806"], uid)` on every purchase path, or every cycle in an enrollment-code map contains the same codes.
   - Keep them after the direct cycle codes and combo codes.

5. Deduplicate within each cycle while preserving first-seen order.

## Output Rules

Return exactly one line per cycle:

```text
Cycle 1 - 622, 628, 703, 706, 705, 708, 805, 806
Cycle 2 - 623, 629, 704, 707, 705, 708, 805, 806
```

Do not use bullets, tables, markdown code fences, or extra explanation unless the user asks for notes.

## Validation Checklist

- Every `Cycle-N` folder has been checked.
- Both no-book and with-book codes are included when present.
- Combo codes are included only for cycles they unlock.
- Full-course or all-cycle codes are included for every cycle.
- No duplicate codes appear on the same line.
