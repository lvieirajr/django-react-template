from uuid import uuid4

from django_react_template.models import BaseModel
from tests import UnitTest


class Model(BaseModel):
    pass


class TestBaseModel(UnitTest):
    @classmethod
    def setup_class(cls):
        cls.model = Model(id=uuid4())

    def test_repr_returns_expected_string(self):
        assert repr(self.model) == f"Model(id='{self.model.id}')"

    def test_str_returns_expected_string(self):
        assert str(self.model) == f"Model(id='{self.model.id}')"
