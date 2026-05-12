from setuptools import setup, find_packages

setup(
    name="ceejiye",
    version="1.0.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "click",
        "rich",
        "prompt_toolkit",
        "pygments",
        "colorama",
    ],
    entry_points={
        "console_scripts": [
            "ceejiye=ceejiye.cli:main",
        ],
    },
    author="Ceejiye",
    description="A Somali language programming language inspired by Python.",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/ceejiye/ceejiye-lang",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.7',
)
