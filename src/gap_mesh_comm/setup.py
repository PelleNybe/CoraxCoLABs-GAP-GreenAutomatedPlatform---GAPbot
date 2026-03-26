from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'gap_mesh_comm'

setup(
    name=package_name,
    version='0.0.1',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Pelle Nyberg',
    maintainer_email='info@coraxcolab.com',
    description='ROS 2 mesh communication scaffolding for the GAP ecosystem (GAPbot and GAPdrone).',
    license='MIT',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'swarm_communicator = gap_mesh_comm.swarm_communicator:main',
        ],
    },
)
