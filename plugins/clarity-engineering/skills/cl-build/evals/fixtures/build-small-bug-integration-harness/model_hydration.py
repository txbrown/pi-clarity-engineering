MISSING = object()


class ValidationError(ValueError):
    pass


def hydrate(payload):
    if "required" not in payload:
        raise ValidationError("required field is missing")

    optional = payload.get("optional", MISSING)
    if optional is MISSING:
        optional = "default"

    return {"required": payload["required"], "optional": optional}
