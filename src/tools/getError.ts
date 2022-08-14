import type { FieldErrorsImpl, DeepRequired, FieldValues } from "react-hook-form";

export function getError(id: string, errors: FieldErrorsImpl<DeepRequired<FieldValues>>): unknown {
    const [a, ...b] = id.split(".");
    if (b.length === 0) {
        return errors[a];
    }

    if (errors[a] === undefined) {
        return;
    }

    return getError(b.join("."), errors[a] as typeof errors);
}
