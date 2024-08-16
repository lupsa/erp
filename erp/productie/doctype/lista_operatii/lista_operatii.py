# Copyright (c) 2024, Darius and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
from frappe.model.naming import getseries


class ListaOperatii(Document):
    def autoname(self):
        seria = getseries(self.denumire_produs, 2)
        self.name = "Operatii - " + self.denumire_produs + " #" + seria
