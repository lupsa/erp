# Copyright (c) 2024, Darius and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class MateriePrima(Document):
    def autoname(self):
        if (self.tip == "Tablă"):
            self.name = "{} {} {}".format(self.tip, self.grosime, self.calitate)
        else:
            if self.calitate:
                self.name = "{} {} {}".format(self.tip, self.cod, self.calitate)
            else:
                self.name = "{} {}".format(self.tip, self.cod)

