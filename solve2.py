from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Function to fill out the form
def fill_form(answers):
    # Initialize Chrome WebDriver (make sure you have chromedriver installed)
    driver = webdriver.Chrome()
    driver.maximize_window()

    # Navigate to the form page
    driver.get("https://teams.microsoft.com/v2/?culture=ar-sa&country=ww")

    # Loop through answers and fill out the form fields
    for question_num, answer in answers.items():
        # Construct XPath for each question based on its number
        xpath = f"//input[@name='answer{question_num}']"  # Adjust based on the actual form field names
        try:
            # Find the input field corresponding to the question
            input_field = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, xpath)))
            # Fill the input field with the answer
            input_field.send_keys(answer)
        except Exception as e:
            print(f"Error filling question {question_num}: {e}")

    # Submit the form (adjust the XPath if needed)
    submit_button = driver.find_element_by_xpath("//button[@type='submit']")
    submit_button.click()

    # Close the WebDriver
    driver.quit()

# Example answers (replace with your own)
answers = {
    1: "A",
    2: "B",
    # Add more answers for each question
}

# Call the function to fill out the form with the answers
fill_form(answers)
