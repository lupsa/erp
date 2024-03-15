# Copyright (c) 2024, Darius and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Operatii(Document):
    def autoname(self):
        if self.tip_operatie == "Vopsire":
            self.name = "{} {}".format(self.tip_operatie, self.cod_vopsire)
        else:
            self.name = self.tip_operatie
