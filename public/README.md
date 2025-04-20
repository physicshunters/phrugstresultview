# CSV Files Directory

Place your model test CSV files in this directory. The application will read files with names like:
- modeltest01.csv
- modeltest02.csv
- modeltest03.csv

## File Format
The CSV files should have the following columns:
\`\`\`
Position,Roll,Mobile,Name,College,HSC,Model_Test,PHY_true,PHY_false,PHY_marks,CHEM_true,CHEM_false,CHEM_marks,ICT_true,ICT_false,ICT_marks,MATH_BIO_true,MATH_BIO_false,MATH_BIO_marks,BIO_true,BIO_false,BIO_marks,MATH_true,MATH_false,MATH_marks,PHY_CHEM_ICT,Best_Optional,Total,Time,Total_Wrong
\`\`\`

## Example
See the sample-modeltest.csv file in this directory for an example of the expected format.

## Important Notes
- Make sure the CSV files have headers matching the format above
- The Model_Test column should contain the model test number
- All files will be combined into a single dataset in the application
