#!/usr/bin/env python3
"""Optional legacy account importer.

Requirements:
    python -m pip install pymongo bcrypt
    export MONGODB_URI="your private MongoDB connection string"
    python import_script.py /path/to/private/users.csv

Do not commit account exports, passwords, or MongoDB credentials.
This importer is NOT used by the Expo application.
"""

import argparse
import csv
import os
import sys

import bcrypt
from pymongo import MongoClient


def main():
    parser = argparse.ArgumentParser(description="Import local account CSV data.")
    parser.add_argument("csv_path", help="Private CSV file stored outside the repository")
    args = parser.parse_args()

    uri = os.environ.get("MONGODB_URI")
    if not uri:
        parser.error("Set the MONGODB_URI environment variable before importing.")

    database_name = os.environ.get("MONGODB_DATABASE", "HoopsCapstone")
    imported = 0

    with open(args.csv_path, encoding="utf-8-sig", newline="") as data_file:
        reader = csv.reader(data_file)
        next(reader, None)  # CSV header
        with MongoClient(uri, serverSelectionTimeoutMS=5000) as client:
            client.admin.command("ping")
            collection = client[database_name]["accounts"]
            for line_number, row in enumerate(reader, start=2):
                if not any(field.strip() for field in row):
                    continue
                if len(row) < 8 or not row[0].strip() or not row[1].strip():
                    raise ValueError(f"Missing required columns on CSV row {line_number}")
                password_hash = bcrypt.hashpw(row[7].encode("utf-8"), bcrypt.gensalt())
                document = {
                    "isAdmin": False,
                    "username": f"{row[0].strip().lower()}{row[1].strip()[0].lower()}",
                    "fname": row[0].strip(),
                    "lname": row[1].strip(),
                    "state": row[4].strip(),
                    "zip_code": row[5].strip(),
                    "email": row[6].strip(),
                    "password": password_hash,
                    "reviews": [],
                }
                collection.insert_one(document)
                imported += 1

    print(f"Imported {imported} account records.")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError) as exc:
        print(f"Import failed: {type(exc).__name__}", file=sys.stderr)
        sys.exit(1)
