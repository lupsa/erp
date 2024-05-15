# Copyright (c) 2024, Darius and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class AdreseLivrare(Document):
    def autoname(self):
        adr = self.adresa
        adr = ' '.join(adr.splitlines())
        self.name = adr
