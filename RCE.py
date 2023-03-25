import subprocess

def main():
    user_in = input(">")

    while user_in != "-1":
        bash_command = sanitize(user_in)
        to_execute = legalCommands(bash_command)

        process = subprocess.Popen(to_execute,
                                   stdout=subprocess.PIPE,
                                   shell=True)

        output, error = process.communicate()

        if output:
            print(str(output, 'utf-8'))
        elif error:
            print(str(error, 'utf-8'))
        user_in = input(">")

def sanitize(command):
    if "&" in command or ";" in command or "|" in command:
        return "echo Invalid Command"
    else:
        return command

def legalCommands(bash_command):
    list_legal = ["ls", "cd", "echo"]
    if bash_command.split(" ")[0] in list_legal:
        return bash_command
    else:
        return "echo Invalid Command"


main()