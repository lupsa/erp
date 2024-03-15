# Copyright (c) 2024, Darius and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Articol(Document):
    def autoname(self):
        self.name = self.denumire
