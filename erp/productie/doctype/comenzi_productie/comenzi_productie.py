# Copyright (c) 2024, Darius and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime
from frappe.model.naming import getseries
from frappe.model.document import Document


class ComenziProductie(Document):
    def autoname(self):
        year = datetime.now().strftime('%Y')[2:4]
        name_prefix = "{}{}".format(year, self.cod_client)
        seria = getseries(name_prefix, 3)
        self.name = "CP " + name_prefix + seria

