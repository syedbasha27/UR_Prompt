import subprocess
import json
import sys
from typing import Dict, List

def execute_code_safely(code: str, test_cases: str, timeout: int = 5) -> Dict:
    """
    Execute code in a restricted environment
    Returns execution results
    """
    try:
        test_cases_list = json.loads(test_cases) if test_cases else []
    except:
        test_cases_list = []
    
    results = {
        "passed": 0,
        "failed": 0,
        "total": len(test_cases_list),
        "details": [],
        "error": None
    }
    
    if not test_cases_list:
        return results
    
    for i, test_case in enumerate(test_cases_list):
        try:
            # Create a test script
            test_script = f"""
import sys
import json
from io import StringIO

# Capture stdout
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
    # User's code
{chr(10).join('    ' + line for line in code.split(chr(10)))}
    
    # Get the output
    output = sys.stdout.getvalue()
    sys.stdout = old_stdout
    
    # Execute test
    input_data = {json.dumps(test_case.get('input', {}))}
    expected = {json.dumps(test_case.get('expected', ''))}
    
    # Try to call main function if exists
    result = None
    if 'main' in dir():
        result = main(**input_data) if isinstance(input_data, dict) else main(input_data)
    
    # Compare result
    if result is not None:
        print(json.dumps({{"result": str(result), "expected": str(expected), "match": str(result) == str(expected)}}))
    else:
        print(json.dumps({{"result": output.strip(), "expected": str(expected), "match": output.strip() == str(expected)}}))
        
except Exception as e:
    sys.stdout = old_stdout
    print(json.dumps({{"error": str(e)}}))
"""
            
            # Execute with timeout
            result = subprocess.run(
                [sys.executable, "-c", test_script],
                capture_output=True,
                text=True,
                timeout=timeout
            )
            
            if result.returncode == 0:
                try:
                    test_result = json.loads(result.stdout)
                    if test_result.get("match"):
                        results["passed"] += 1
                        results["details"].append({
                            "test": i + 1,
                            "status": "passed",
                            "input": test_case.get("input"),
                            "expected": test_case.get("expected"),
                            "actual": test_result.get("result")
                        })
                    else:
                        results["failed"] += 1
                        results["details"].append({
                            "test": i + 1,
                            "status": "failed",
                            "input": test_case.get("input"),
                            "expected": test_result.get("expected"),
                            "actual": test_result.get("result")
                        })
                except:
                    results["failed"] += 1
                    results["details"].append({
                        "test": i + 1,
                        "status": "error",
                        "message": result.stdout or result.stderr
                    })
            else:
                results["failed"] += 1
                results["details"].append({
                    "test": i + 1,
                    "status": "error",
                    "message": result.stderr
                })
                
        except subprocess.TimeoutExpired:
            results["failed"] += 1
            results["details"].append({
                "test": i + 1,
                "status": "timeout",
                "message": "Execution timed out"
            })
        except Exception as e:
            results["failed"] += 1
            results["details"].append({
                "test": i + 1,
                "status": "error",
                "message": str(e)
            })
    
    return results


def evaluate_code_output(execution_results: Dict) -> float:
    """
    Calculate score based on test case results
    Returns score 0-10
    """
    if execution_results["total"] == 0:
        return 0.0
    
    pass_rate = execution_results["passed"] / execution_results["total"]
    return round(pass_rate * 10, 2)