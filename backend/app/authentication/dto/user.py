from dataclasses import dataclass

from app.common.dto import BaseDTO


@dataclass
class UserDTO(BaseDTO):
    name: str
    email: str
    is_active: str
    is_staff: str
