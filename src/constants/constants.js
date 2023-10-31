import { ExpenseNumberingFormat, ExpenseNumberSeparators  } from "./enums";
//Default object for numering expenses
export const DEFAULT_EXPENSE_NUMBERING = {
            expenseNumberDigits: 3,
            expenseNumberFormat: ExpenseNumberingFormat.YMN,
            expenseNumberStart: 1,
            expenseNumberYearDigits: 4,
            expenseNumberSeparator: ExpenseNumberSeparators.Hyphen,
            expenseNumberCustomPrefix: ""
};