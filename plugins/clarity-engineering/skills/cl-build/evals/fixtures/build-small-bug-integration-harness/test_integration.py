from model_hydration import ValidationError
from payload_parser import parse_model


def main():
    assert parse_model('{"required": "value"}') == {
        "required": "value",
        "optional": "default",
    }
    assert parse_model('{"required": "value", "optional": null}') == {
        "required": "value",
        "optional": "default",
    }

    try:
        parse_model('{"optional": null}')
    except ValidationError:
        pass
    else:
        raise AssertionError("required-field validation was lost")

    print("integration harness passed")


if __name__ == "__main__":
    main()
